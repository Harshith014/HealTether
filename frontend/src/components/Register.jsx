import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
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
  const { isLoading, error } = useSelector((state) => state.auth || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register({ username, email, password }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      setEmail('');
      setPassword('');
      setUserName('');
      navigate('/login');
    }
  };

  return (
    <Box
      maxWidth={{ base: '90%', md: '400px' }}
      margin="auto"
      mt={{ base: 8, md: 12 }}
      p={{ base: 4, md: 6 }}
    >
      <Heading 
        as="h2" 
        size="lg" 
        textAlign="center" 
        mb={6} 
        color="green.500" 
        fontWeight="bold"
      >
        Register
      </Heading>

      {error?.general && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error.general}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl 
            id="username" 
            isRequired 
            isInvalid={error?.username}
          >
            <FormLabel>Username</FormLabel>
            <Input 
              type="text" 
              value={username} 
              onChange={(e) => setUserName(e.target.value)} 
            />
            <FormErrorMessage>{error?.username}</FormErrorMessage>
          </FormControl>

          <FormControl 
            id="email" 
            isRequired 
            isInvalid={error?.email}
          >
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <FormErrorMessage>{error?.email}</FormErrorMessage>
          </FormControl>

          <FormControl 
            id="password" 
            isRequired 
            isInvalid={error?.password}
          >
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <FormErrorMessage>{error?.password}</FormErrorMessage>
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="green" 
            width="full" 
            isLoading={isLoading}
          >
            Register
          </Button>

          <Text>
            Already have an account?{' '}
            <Link 
              color="green.500" 
              onClick={() => navigate('/login')}
            >
              Log in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;