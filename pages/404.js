import { Box, Button, Text, Image } from "@skynexui/components";
import React from 'react';
import appConfig from '../config.json';

export default function Error404() {
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[999],
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Image
          styleSheet={{
            marginBottom: '16px',
          }}
          src={'https://c.tenor.com/0LZHQE3DeucAAAAC/time-paradox-mgs3.gif'}
        />

        <Text
          variant='body1'
          styleSheet={{
            color: appConfig.theme.colors.neutrals['000'],
            fontSize: '24px',
            padding: '8px 10px',
          }}
        >
          {'Você causou um paradoxo temporal'}
        </Text>

        <Text
          variant='body2'

          styleSheet={{
            color: appConfig.theme.colors.neutrals['000'],
            padding: '8px 10px',
          }}
        >
          {'Ocorreu um erro ao entrar com dados do usuário'}
        </Text>

        <Box as='form'></Box>
        <Button
          type='button'
          onClick={() => (window.location.href = '/')}
          label='Voltar à página inicial'
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals['000'],
            mainColor: appConfig.theme.colors.primary[400],
            mainColorLight: appConfig.theme.colors.primary[300],
            mainColorStrong: appConfig.theme.colors.primary[500],
          }}
          styleSheet={{
            borderRadius: '100px',
            marginTop: '16px',
          }}
        />
      </Box>
    </>
  );
}