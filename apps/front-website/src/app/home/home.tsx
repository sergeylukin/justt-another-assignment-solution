import { feedApi, fetchFeed } from '@justt/front-website/data-access-feed';
import { useState, useEffect, useMemo, useLayoutEffect, Suspense } from 'react';
import { map, catchError, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  Button,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { FrontWebsiteFeatureFeedList as FeedList } from '@justt/front-website/feature-feed-list';
import { TransactionWithCustomer } from '@justt/api-interfaces';

const useObservable = (observable: Observable<any>) => {
  const [value, setValue] = useState();
  useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setValue(result);
    });
    return () => subscription.unsubscribe();
  }, [observable]);
  return value;
};

const DesktopBar = ({ setSearchString, submit }: BarInterface) => {
  return (
    <Input
      placeholder="Search by credit card type/currency"
      width="100%"
      onChange={(evt) => setSearchString(evt.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          submit();
        }
      }}
      mr={5}
    />
  );
};

interface BarInterface {
  setSearchString: (value: string) => void;
  submit: () => void;
}

const MobileBar = ({ setSearchString, submit }: BarInterface) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      <p>Search:</p>
      <Input
        placeholder="Search by credit card type/currency"
        width="100%"
        onChange={(evt) => setSearchString(evt.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
        mr={5}
      />
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'red.400'}
        _hover={{
          bg: 'red.300',
        }}
        onClick={() => {
          submit();
        }}
      >
        Search
      </Button>
    </Stack>
  );
};

export function Home() {
  const { isOpen, onToggle } = useDisclosure();
  // const [feed, setFeed] = useState<TransactionWithCustomer[]>([]);
  const [searchString, setSearchString] = useState('');
  const [fetchSearchString, setFetchSearchString] = useState('');

  const [chatState, setChatState] = useState(feedApi.chatStore.initialState);
  useLayoutEffect(() => {
    feedApi.chatStore.subscribe(setChatState);
    feedApi.chatStore.init();
    feedApi.chatStore.fetch();
  }, []);

  useEffect(() => {
    feedApi.chatStore.fetch();
  }, [fetchSearchString]);

  const feed$ = useMemo(
    () =>
      fetchFeed(fetchSearchString).pipe(
        map((data) => <FeedList feed={data} setFeed={setFeed} />),
        catchError(() => of(<div className="err">ERROR</div>)),
        startWith(<div className="loading">loading...</div>)
      ),
    [fetchSearchString]
  );
  const output = useObservable(feed$);
  const submit = () => {
    setFetchSearchString(searchString);
  };

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              display={'flex'}
              alignItems="center"
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              JusTT
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} width="100%" ml={10}>
              <DesktopBar setSearchString={setSearchString} submit={submit} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'red.400'}
              _hover={{
                bg: 'red.300',
              }}
              onClick={submit}
            >
              Search
            </Button>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileBar setSearchString={setSearchString} submit={submit} />
        </Collapse>
      </Box>
      {/*<$>{feed$}</$>*/}
      {output}
      {chatState.data.map((item) => (
        <div>{item.id}</div>
      ))}
    </>
  );
}

export default Home;
