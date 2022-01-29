import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NDcyMCwiZXhwIjoxOTU4OTcwNzIwfQ.sPj9G74phO_8s6GE0S_J1QaJ7zTGsbr0O1RgMakXZXc';
const SUPABASE_URL = 'https://hqoetokljuhbrnryyyhk.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  // Sua lógica vai aqui
  supabaseClient
    .from('mensagens')
    .select('*')
    .then((dados) => {
      console.log('Dados da consulta:', dados);
    });

  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const roteamento = useRouter();
  const { username } = roteamento.query;

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', {ascending: false })
      .then(({ data }) => {
        console.log('Dados da consulta:', data);
        setListaDeMensagens(data);
      });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: (username),
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data);
        // Chamada de um backend
        setListaDeMensagens([
            data[0],
            ...listaDeMensagens, 
        ]);
      })
      
      setMensagem("");
  }

  function recarregarMensagens() {
    setListaDeMensagens(listaDeMensagens.filter(function (mensagem) {
      return !mensagem.delete
    }));
  }
  
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[200],
        backgroundImage: `url(https://images7.alphacoders.com/111/1115466.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "1920px 1080px",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
       <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 10%)",
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
            backgroundColor: "rgba(0, 0, 0, 0.40)",
            border: "2px solid rgba(255,101,80,1)",
            borderColor: appConfig.theme.colors.neutrals['000'],
            borderRadius: "16px",
            minHeight: "240px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2.6px)",
            webkitBackdropFilter: "blur(2.6px)",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              flexDirection: "column",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.30)",
              border: "1px solid rgba(0, 0, 0, 0.88)",
              borderColor: appConfig.theme.colors.primary[200],
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(2.6px)",
              webkitBackdropFilter: "blur(2.6px)",
            }}
        >
          <MessageList mensagens={listaDeMensagens} recarregarMensagens={recarregarMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  {mensagem.length > 0 ? handleNovaMensagem(mensagem) : alert('Preencha o campo de texto para enviar a mensagem')};
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "95%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                {mensagem.length > 0 ? handleNovaMensagem(mensagem) : alert('Preencha o campo de texto para enviar a mensagem')};
              }}
              styleSheet={{
                width: "5%",
                borderRadius: "5px",
                height: "75%",
                marginBottom: "8px"
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[999],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[300],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: 'break-word',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Icon 
                name={"FaTrash"}
                styleSheet={{
                  marginLeft: "auto",
                  marginRight: ".7rem",
                  transition: ".4s ease all",
                  cursor: "pointer",
                  hover: {
                    color: appConfig.theme.colors.neutrals['000']
                  }
                }}
                onClick={() => {
                  mensagem.delete = true;
                  props.recarregarMensagens();
                }}
              ></Icon>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}