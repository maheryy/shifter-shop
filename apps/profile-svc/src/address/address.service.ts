import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CustomerProfile } from 'src/customer/entities/customer-profile.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(
    createAddressDto: CreateAddressDto & { profile: CustomerProfile },
  ) {
    const { setDefault, ...fields } = createAddressDto;

    const addresses = await this.addressRepository.find({
      where: {
        profile: {
          userId: createAddressDto.profile.userId,
        },
      },
    });

    const isFirst = addresses.length === 0;

    if (!isFirst && setDefault) {
      await this.addressRepository.update(
        { profile: { userId: createAddressDto.profile.userId } },
        { isDefault: false },
      );
    }

    const address = this.addressRepository.create({
      ...fields,
      isDefault: isFirst || setDefault,
    });

    return this.addressRepository.save(address);
  }

  findByProfile(profilId: CustomerProfile['userId']) {
    return this.addressRepository.find({
      where: {
        profile: {
          userId: profilId,
        },
      },
    });
  }

  findAll() {
    return this.addressRepository.find();
  }

  async update(
    profileId: CustomerProfile['userId'],
    id: Address['id'],
    updateAddressDto: UpdateAddressDto,
  ) {
    const { setDefault, ...fields } = updateAddressDto;

    const { affected } = await this.addressRepository.update(
      { profile: { userId: profileId }, id },
      fields,
    );

    if (affected === 0) {
      throw new NotFoundException("This address doesn't exist");
    }

    if (setDefault) {
      await this.addressRepository.update(
        { profile: { userId: profileId } },
        { isDefault: false },
      );

      await this.addressRepository.update(
        { profile: { userId: profileId }, id },
        { isDefault: true },
      );
    }

    return this.addressRepository.findOneBy({ id });
  }

  findOneById(profileId: CustomerProfile['userId'], id: Address['id']) {
    return this.addressRepository.findOne({
      where: { profile: { userId: profileId }, id },
    });
  }

  async remove(profileId: CustomerProfile['userId'], id: Address['id']) {
    const address = await this.addressRepository.findOne({
      where: { profile: { userId: profileId }, id },
    });

    if (!address) {
      throw new NotFoundException("This address doesn't exist");
    }

    await this.addressRepository.delete({
      profile: { userId: profileId },
      id,
    });
  }

  async setDefault(profileId: CustomerProfile['userId'], id: Address['id']) {
    const address = await this.addressRepository.findOne({
      where: { profile: { userId: profileId }, id },
    });

    if (!address) {
      throw new NotFoundException("This address doesn't exist");
    }

    await this.addressRepository.update(
      { profile: { userId: profileId } },
      { isDefault: false },
    );

    await this.addressRepository.update(
      { profile: { userId: profileId }, id },
      { isDefault: true },
    );
  }
}
