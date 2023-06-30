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

  create(createAddressDto: CreateAddressDto & { profile: CustomerProfile }) {
    const address = this.addressRepository.create(createAddressDto);

    return this.addressRepository.save(address);
  }

  findByProfile(profilId: CustomerProfile['id']) {
    return this.addressRepository.find({
      where: {
        profile: {
          id: profilId,
        },
      },
    });
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(
    profileId: CustomerProfile['id'],
    id: Address['id'],
    updateAddressDto: UpdateAddressDto,
  ) {
    const result = await this.addressRepository.update(
      { profile: { id: profileId }, id },
      updateAddressDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException("This address doesn't exist");
    }

    return this.addressRepository.findOneBy({ id });
  }

  remove(profileId: CustomerProfile['id'], id: Address['id']) {
    return this.addressRepository.delete({
      profile: { id: profileId },
      id,
    });
  }
}
