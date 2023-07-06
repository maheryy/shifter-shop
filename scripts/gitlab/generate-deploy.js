const { writeFileSync } = require("fs");

const createBaseFile = () => `
stages:
  - publish
  - deploy
`;

const createEmptyJob = () => `
publish:empty:
  stage: publish
  script:
    - echo 'No apps affected to publish !'

deploy:empty:
  stage: deploy
  script:
    - echo 'No apps affected to deploy !'
`;

const createJob = (app) => `
publish:${app}:
  stage: publish
  image: docker
  services:
    - name: docker:dind
      alias: docker
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build . \
      --tag "$CI_REGISTRY/shifter-shop/shifter-shop/${app}:latest" \
      --file apps/${app}/Dockerfile \
      --build-arg "VITE_API_URL=https://api.shiftershop.pro"
    - docker push "$CI_REGISTRY/shifter-shop/shifter-shop/${app}"

deploy:${app}:
  stage: deploy
  needs: ["publish:${app}"]
  image:
    name: bitnami/kubectl:latest
    entrypoint: [""]
  script:
    - kubectl config use-context "$KUBE_CONTEXT"
    - kubectl rollout restart deployment/${app} -n default
`;

const generateConfig = (apps) => {
  if (!apps.length) {
    return createBaseFile().concat(createEmptyJob());
  }

  return createBaseFile().concat(
    apps.map((app) => createJob(app.trim())).join("\n")
  );
};

const main = () => {
  const [affectedResults] = process.argv.slice(2);
  const projects = affectedResults.trim()
    ? affectedResults.trim().split(",")
    : [];
  const content = generateConfig(projects);
  writeFileSync("deploy-affected-config.yml", content);
};

main();
