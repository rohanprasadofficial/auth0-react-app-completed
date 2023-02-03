import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  container : {
    display:"flex",
    justifyContent:"center"
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const  Profile = () => {
    const { classes } = useStyles();
    const { user } = useAuth0();
    return(
        <div className={classes.container}> 
        <Group noWrap>
          <Avatar src={user.picture} size={94} radius="md" />
          <div>
            <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
              {user.name}
            </Text>
  
            <Text size="lg" weight={500} className={classes.name}>
              {user.nickname}
            </Text>
  
            <Group noWrap spacing={10} mt={3}>
              <IconAt stroke={1.5} size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {user.email}
              </Text>
            </Group>

          </div>
        </Group>
      </div>)
 };


 export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
  });