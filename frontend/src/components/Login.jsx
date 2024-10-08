import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
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
      {/* Heading for the login form */}
      <Heading as="h2" size="lg" textAlign="center" mb={6} color="blue.500" fontWeight="bold">
        Login
      </Heading>

      <form onSubmit={handleSubmit} style={{ marginTop: '7em' }}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading}>
            Login
          </Button>

          {/* Link for users without an account */}
          <Text>
            No account?{' '}
            <Link color="blue.500" onClick={() => navigate('/register')}>
              Register
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
