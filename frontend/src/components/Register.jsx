import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/authSlice';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <Box
      maxWidth={{ base: '90%', md: '400px' }}
      margin="auto"
      mt={{ base: 8, md: 12 }}
      p={{ base: 4, md: 6 }}
    >
      {/* Heading for the form */}
      <Heading as="h2" size="lg" textAlign="center" mb={6} color="green.500" fontWeight="bold">
        Register
      </Heading>

      {/* Form for registration */}
      <form onSubmit={handleSubmit} style={{ marginTop: '7em' }}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
            {error && error.username && <Text color="red.500">{error.username}</Text>}
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && error.email && <Text color="red.500">{error.email}</Text>}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && error.password && <Text color="red.500">{error.password}</Text>}
          </FormControl>
          {error && error.general && <Text color="red.500">{error.general}</Text>}

          <Button type="submit" colorScheme="green" width="full" isLoading={isLoading}>
            Register
          </Button>

          {/* Link to login */}
          <Text>
            Already have an account?{' '}
            <Link color="green.500" onClick={() => navigate('/login')}>
              Log in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
