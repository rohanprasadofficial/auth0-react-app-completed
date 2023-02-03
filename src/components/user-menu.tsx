import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Group, Menu, UnstyledButton, createStyles, Text} from "@mantine/core";
import { IconChevronDown, IconHeart, IconStar, IconMessage, IconSettings, IconSwitchHorizontal, IconLogout, IconPlayerPause, IconTrash } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
    header: {
      paddingTop: theme.spacing.sm,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
      marginBottom: 120,
    },
  
    mainSection: {
      paddingBottom: theme.spacing.sm,
    },
  
    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },
  
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('xs')]: {
        display: 'none',
      },
    },
  
    userActive: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  
    tabs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    tabsList: {
      borderBottom: '0 !important',
    },
  
    tab: {
      fontWeight: 500,
      height: 38,
      backgroundColor: 'transparent',
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      },
  
      '&[data-active]': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      },
    },
  }));

  
export const  UserMenu = () => {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const {
      user,
      logout,
    } = useAuth0();
    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
    return(
        <div>
        <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          >
            <Group spacing={7}>
              <Avatar src={'https://media-exp1.licdn.com/dms/image/D5616AQEk-SiPdqh6Bw/profile-displaybackgroundimage-shrink_350_1400/0/1665989036761?e=1674691200&v=beta&t=wmM4eiijZhh89j3DEv8toSHEFAwyQlkpv-UFn6WJukU'} alt={'rohan'} radius="xl" size={20} />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user.name} 
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>
            Liked recipes
          </Menu.Item>
          <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
            Saved recipes
          </Menu.Item>
          <Menu.Item icon={<IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
            Your recipes
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item onClick={() => logoutWithRedirect()} icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
            Pause subscription
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      </div>
    )
};