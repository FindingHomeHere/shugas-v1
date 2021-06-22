import { Flex, Image } from '@chakra-ui/react';

const HomeMap = () => {
  const imgSrc = {
    // mapbox://styles/fhhere/ckjrwuvt5745n19loefj98bma  --white
    // mapbox://styles/fhhere/ckolzk70l0bhf18un55nof91t  --teal
    base: 'https://api.mapbox.com/styles/v1/fhhere/ckolzk70l0bhf18un55nof91t/static/pin-l+b0f2f0(-104.8262,38.8244)/-104.8262,38.825,15.2/600x800?access_token=pk.eyJ1IjoiZmhoZXJlIiwiYSI6ImNrb216ZjI2NTBscGUydW8xOXkxMDhhemsifQ.Ni68kJ-7uCaLcOGoquRTYw',
    lg: 'https://api.mapbox.com/styles/v1/fhhere/ckolzk70l0bhf18un55nof91t/static/pin-l+b0f2f0(-104.8262,38.8244)/-104.8262,38.825,14.4,0/1200x600?access_token=pk.eyJ1IjoiZmhoZXJlIiwiYSI6ImNrb216ZjI2NTBscGUydW8xOXkxMDhhemsifQ.Ni68kJ-7uCaLcOGoquRTYw',
  };
  return (
    <>
      <Flex display={{ base: 'block', lg: 'none' }}>
        <Image src={imgSrc.base} />
      </Flex>
      <Flex display={{ base: 'none', lg: 'block' }}>
        <Image src={imgSrc.lg} />
      </Flex>
    </>
  );
};

export default HomeMap;
