/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-r, blue.500, green.500)"
      py={{ base: 12, md: 16 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex justify="center" mb={{ base: 4, md: 8 }}>
        <Image src="https://www.healtether.com/images/logo.png" alt="HealTether Logo" />
      </Flex>
      <VStack spacing={4} align="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="bold"
          color="white"
          mb={{ base: 2, md: 4 }}
        >
          Welcome to HealTether
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="white" mb={{ base: 4, md: 8 }}>
          "Healing is not just about the body, it's about the mind and spirit too."
        </Text>
        <Text fontSize={{ base: 'sm', md: 'md' }} color="white">
          "The greatest wealth is health."
        </Text>
        <Text fontSize={{ base: 'sm', md: 'md' }} color="white">
          "Health is the greatest gift, contentment the greatest wealth."
        </Text>
      </VStack>
    </Box>
  );
};

export default Home;