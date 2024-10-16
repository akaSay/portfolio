import React, { useState } from "react";
import styled from "styled-components";
import EarthCanvas from "../canvas/Earth";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const SuccessMessage = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
`;

const MessageWrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 300px;
`;

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/xeoqqzpg", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <Container>
      <Wrapper>
        <EarthCanvas />
        <Title>Contact</Title>
        <Desc>
          N'hésitez pas à me contacter pour toute question ou opportunité!
        </Desc>
        <ContactForm onSubmit={handleSubmit}>
          <ContactTitle>Envoyez-moi un email 🚀</ContactTitle>
          <ContactInput placeholder="Votre email" name="email" type="email" required />
          <ContactInput placeholder="Votre nom" name="name" type="text" required />
          <ContactInput placeholder="Sujet" name="subject" type="text" required />
          <ContactInputMessage placeholder="Message" name="message" rows={4} required />
          <ContactButton type="submit" value="Envoyer" />
        </ContactForm>
        <AnimatePresence>
          {submitStatus === 'success' && (
            <MessageWrapper
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessMessage>
                Message envoyé avec succès ! Je vous répondrai dès que possible.
              </SuccessMessage>
            </MessageWrapper>
          )}
          {submitStatus === 'error' && (
            <MessageWrapper
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorMessage>
                Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.
              </ErrorMessage>
            </MessageWrapper>
          )}
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
};

export default Contact;