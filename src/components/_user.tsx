import React from 'react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, Image} from '@mantine/core';
import SJ from '../../images/SJ.jpeg';
export function User() {
    const theme = useMantineTheme();

    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop:`1px solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            }}
        >
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                }}
            >
                <Group>
                    <Avatar>
                        <Image src={SJ} width={50} height={50} ></Image>
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            Account
                        </Text>
                        <Text color="dimmed" size="xs">
                            limqianyu10@gmail.com
                        </Text>
                    </Box>
                </Group>
            </UnstyledButton>
        </Box>
    )
}