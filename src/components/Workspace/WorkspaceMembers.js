import { useRouter } from 'next/router';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Cart from '../../components/svg/trash.svg';

function WorkspaceMembers() {
  const router = useRouter();
  const { locale } = router;

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const data = [
    {
      id: 1,
      name: 'Viktor Yushka',
      img: '/ava.png',
      email: 'Yushka@mail.com',
      role: 'Admin',
      activity: 'yesterday',
    },
    {
      id: 2,
      name: 'Alina Mulenco',
      img: '/ava.png',
      email: 'Yushka@mail.com',
      role: 'Admin',
      activity: 'yesterday',
    },
    {
      id: 3,
      name: 'Bogdan Davidov',
      img: '/ava.png',
      email: 'Yushka@mail.com',
      role: 'Admin',
      activity: 'yesterday',
    },
  ];

  const extractName = (name) => {
    return name.split(' ')[0];
  };

  return (
    <>
      <Box w='100%' h='100%' mt='32px'>
        <TableContainer>
          <Table size='md' variant='unstyled' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th fontFamily={'inherit'} fontWeight='400' width='65%'>
                  {t().name}
                </Th>
                <Th fontFamily={'inherit'} fontWeight='400' textAlign='center'>
                  {t().role}
                </Th>
                <Th fontFamily={'inherit'} fontWeight='400' textAlign='center'>
                  {t().last_activity}
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            {data.map(({ id, name, img, email, role, activity }) => (
              <Tbody key={id}>
                <Tr>
                  <Td key={id}>
                    <Box display='flex'>
                      <img src={img} alt='img' width={48} height={48} />
                      <Box ml='16px'>
                        <p className='text-lg'>{name}</p>
                        <p className='text-sm text-my-border-color'>
                          {extractName(name)} {email}
                        </p>
                      </Box>
                    </Box>
                  </Td>
                  <Td textAlign='center'>{role}</Td>
                  <Td textAlign='center'>{activity}</Td>
                  <Td>
                    <button>
                      <Cart className='text-my-gray-color' />
                    </button>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default WorkspaceMembers;
