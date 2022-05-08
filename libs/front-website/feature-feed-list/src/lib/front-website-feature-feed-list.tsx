import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { TransactionWithCustomer } from '@justt/api-interfaces';

interface CardPropsInterface {
  transaction: TransactionWithCustomer;
}
const Card = ({ transaction }: CardPropsInterface) => {
  return (
    <Center py={6}>
      <Box
        w={'3xl'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            {`${transaction.creditCardType} ending in ${transaction.creditCardNumber}`}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
              {transaction.price} {transaction.currency}
            </Text>
          </Stack>
          <Text fontSize={'4xl'} fontWeight={800}>
            {`${transaction.customer.firstName} ${transaction.customer.lastName}`}
          </Text>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <Button
            w={'full'}
            bg={'red.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(187 72 72 / 43%)'}
            _hover={{
              bg: 'red.500',
            }}
            _focus={{
              bg: 'red.500',
            }}
          >
            {`${transaction.customer.street} ${transaction.customer.city},  ${transaction.customer.country}`}
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

/* eslint-disable-next-line */
export interface FrontWebsiteFeatureFeedListProps {
  feed: TransactionWithCustomer[];
}

export function FrontWebsiteFeatureFeedList(
  props: FrontWebsiteFeatureFeedListProps
) {
  const { feed } = props;
  return (
    <Container>
      {Array.isArray(feed) &&
        feed.map((transaction) => <Card transaction={transaction} />)}
    </Container>
  );
}

export default FrontWebsiteFeatureFeedList;
