import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Spacer, useColorMode, useDisclosure, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
    onClose(); // Close the menu after logout
  };

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Box fontWeight="bold">HealTether</Box>
        </Link>

        {/* Spacer to push the content to the right */}
        <Spacer />

        {/* For larger screens (md and up) */}
        <Flex align="center" display={{ base: 'none', md: 'flex' }}>
          {token ? (
            <Button colorScheme="red" mr={4} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button colorScheme="blue" mr={4} onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button colorScheme="green" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
          <IconButton
            ml={4}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
          />
        </Flex>

        {/* Hamburger Menu for smaller screens (base to md) */}
        <Flex align="center" display={{ base: 'flex', md: 'none' }}>
          <IconButton
            size="md"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
            mr={2}
          />
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            aria-label="Toggle Menu"
          />
        </Flex>
      </Flex>

      {/* For smaller screens (base to md) */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack alignItems="start" spacing={4}>
            {token ? (
              <Button colorScheme="red" width="100%" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" width="100%" onClick={() => { navigate('/login'); onClose(); }}>
                  Login
                </Button>
                <Button colorScheme="green" width="100%" onClick={() => { navigate('/register'); onClose(); }}>
                  Register
                </Button>
              </>
            )}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
