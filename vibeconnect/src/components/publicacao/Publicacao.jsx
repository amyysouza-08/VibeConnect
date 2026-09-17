import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './PublicacaoStyles';

import Footer from '../footer/Footer';

export default function Publicacao({ navigation }) {

  const handleVoltar = () => {
    Alert.alert('Voltar', 'Voltando...');
  };

  const handleMenu = () => {
    Alert.alert('Opções', 'Menu da publicação');
  };

  const handleCurtir = () => {
    Alert.alert('Curtida', 'Você curtiu a publicação!');
  };

  const handleComentario = () => {
    Alert.alert('Comentários', 'Área de comentários');
  };

  const handleCompartilhar = () => {
    Alert.alert('Compartilhar', 'Compartilhar publicação');
  };

  const handleSalvar = () => {
    Alert.alert('Salvar', 'Publicação salva!');
  };

  return (
    <View style={styles.container}>

      {/* =========================
          ÁREA QUE SOBE COM O TECLADO
      ========================= */}

      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* =========================
              CABEÇALHO
          ========================= */}

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleVoltar}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../assets/seta-voltar.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleMenu}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../assets/tres-pontos.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>


          {/* =========================
              USUÁRIO
          ========================= */}

          <View style={styles.userContainer}>

            <View style={styles.avatar} />

            <View style={styles.userInfo}>

              <Text style={styles.username}>
                eloysamarques
              </Text>

              <View style={styles.locationContainer}>

                <Image
                  source={require('../../../assets/localizacao.png')}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />

                <Text style={styles.locationText}>
                  Piauí, PI
                </Text>

              </View>

            </View>

          </View>


          {/* =========================
              FOTO DA PUBLICAÇÃO
          ========================= */}

          <Image
            source={require('../../../assets/igreja.png')}
            style={styles.postImage}
            resizeMode="cover"
          />


          {/* =========================
              AÇÕES
          ========================= */}

          <View style={styles.actionsContainer}>

            <View style={styles.actionsLeft}>

              {/* CURTIDA */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleCurtir}
                activeOpacity={0.7}
              >

                <Image
                  source={require('../../../assets/curtida.png')}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  20
                </Text>

              </TouchableOpacity>


              {/* COMENTÁRIOS */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleComentario}
                activeOpacity={0.7}
              >

                <Image
                  source={require('../../../assets/comentario-publicacao.png')}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />

                <Text style={styles.actionNumber}>
                  3
                </Text>

              </TouchableOpacity>


              {/* COMPARTILHAR */}

              <TouchableOpacity
                style={styles.action}
                onPress={handleCompartilhar}
                activeOpacity={0.7}
              >

                <Image
                  source={require('../../../assets/aviao-publicacao.png')}
                  style={styles.shareIcon}
                  resizeMode="contain"
                />

              </TouchableOpacity>

            </View>


            {/* SALVAR */}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSalvar}
              activeOpacity={0.7}
            >

              <Image
                source={require('../../../assets/salvar-publicacao.png')}
                style={styles.saveIcon}
                resizeMode="contain"
              />

            </TouchableOpacity>

          </View>


          {/* =========================
              LEGENDA
          ========================= */}

          <View style={styles.captionContainer}>

            <Text style={styles.caption}>

              <Text style={styles.captionUsername}>
                eloysamarques
              </Text>

              {' Piauí é lindo! 😍'}

            </Text>

            <Text style={styles.hashtags}>
              #VibeTop #Piauí #MinhaCidade
            </Text>

          </View>


          {/* =========================
              VER COMENTÁRIOS
          ========================= */}

          <TouchableOpacity
            style={styles.allCommentsButton}
            activeOpacity={0.7}
          >

            <Text style={styles.allComments}>
              Ver todos os comentários
            </Text>

          </TouchableOpacity>


          {/* =========================
              COMENTÁRIO 1
          ========================= */}

          <View style={styles.commentContainer}>

            <View style={styles.commentAvatar} />

            <View style={styles.commentContent}>

              <Text style={styles.commentText}>

                <Text style={styles.commentUsername}>
                  livialanconi
                </Text>

                {' Que lugar incrível! 😍'}

              </Text>

              <Text style={styles.commentTime}>
                2h
              </Text>

            </View>

          </View>


          {/* =========================
              COMENTÁRIO 2
          ========================= */}

          <View style={styles.commentContainer}>

            <View style={styles.commentAvatar} />

            <View style={styles.commentContent}>

              <Text style={styles.commentText}>

                <Text style={styles.commentUsername}>
                  jamesribeiro
                </Text>

                {' Muito top!!'}

              </Text>

              <Text style={styles.commentTime}>
                1h
              </Text>

            </View>

          </View>


          {/* =========================
              COMENTÁRIO 3
          ========================= */}

          <View style={styles.commentContainer}>

            <View style={styles.commentAvatar} />

            <View style={styles.commentContent}>

              <Text style={styles.commentText}>

                <Text style={styles.commentUsername}>
                  amysouza
                </Text>

                {' Foto lindaaa'}

              </Text>

              <Text style={styles.commentTime}>
                2h
              </Text>

            </View>

          </View>


          {/* =========================
              COMENTÁRIO 4
          ========================= */}

          <View style={styles.commentContainer}>

            <View style={styles.commentAvatar} />

            <View style={styles.commentContent}>

              <Text style={styles.commentText}>

                <Text style={styles.commentUsername}>
                  gustavooliv
                </Text>

                {' 👏👏👏👏'}

              </Text>

              <Text style={styles.commentTime}>
                2h
              </Text>

            </View>

          </View>


          {/* =========================
              ADICIONAR COMENTÁRIO
          ========================= */}

          <View style={styles.commentInputRow}>

            <View style={styles.commentInputAvatar} />

            <View style={styles.commentInputContainer}>

              <TextInput
                style={styles.commentInput}
                placeholder="Adicione um comentário..."
                placeholderTextColor="#6E9AA5"
                returnKeyType="send"
              />

              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.7}
              >

                <Image
                  source={require('../../../assets/aviao.png')}
                  style={styles.sendIcon}
                  resizeMode="contain"
                />

              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>


      {/* =========================
          FOOTER
      ========================= */}

      <Footer
     navigation={navigation}
    />

    </View>
  );
}