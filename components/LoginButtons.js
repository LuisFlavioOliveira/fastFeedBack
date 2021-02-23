/* eslint-disable import/no-unresolved */
import { Button, Flex } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
  const auth = useAuth();

  return (
    <Flex direction={['column', 'row']}>
      <Button
        onClick={() => auth.signinWithGithub()}
        backgroundColor="gray.900"
        colorScheme="white"
        fontWeight="bold"
        leftIcon={<FaGithub />}
        mt={4}
        mr={2}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="white"
        colorScheme="gray.900"
        variant="outline"
        fontWeight="bold"
        leftIcon={<FcGoogle />}
        mt={4}
        _hover={{ bg: 'blue.100' }}
        _active={{
          bg: 'blue.100',
          transform: 'scale(0.95)',
        }}
      >
        Continue with Google
      </Button>
    </Flex>
  );
};

export default LoginButtons;
