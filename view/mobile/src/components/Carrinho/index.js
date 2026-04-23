import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal
} from 'react-native';
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function DadosConta() {

  const [perfil, setPerfil] = useState({
    nome: 'Pedro Silva',
    email: 'pedro@email.com',
    telefone: '(11) 99999-9999',
    senha: '',
    senha_confirmar: ''
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [perfilEditando, setPerfilEditando] = useState(perfil);
  const [erroSenha, setErroSenha] = useState('');

  function abrirModal() {
    setPerfilEditando(perfil);
    setErroSenha('');
    setModalVisible(true);
  }

  function validarSenha() {
    if (perfilEditando.senha.length < 6) {
      setErroSenha('Senha precisa ter pelo menos 6 caracteres');
      return false;
    }

    if (perfilEditando.senha !== perfilEditando.senha_confirmar) {
      setErroSenha('As senhas não coincidem');
      return false;
    }

    setErroSenha('');
    return true;
  }

  function salvar() {
    if (!validarSenha()) return;

    setPerfil(perfilEditando);
    setModalVisible(false);
  }

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#fff" marginTop={30} />
        <Text style={styles.username}>
          {perfil.nome || 'Usuário'}
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados da Conta</Text>

        <Info label="Nome:" value={perfil.nome} />
        <Info label="Email:" value={perfil.email} />
        <Info label="Telefone:" value={perfil.telefone} />
        <Info label="Senha:" value={perfil.senha ? '••••••••' : '-'} />

        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={abrirModal}
        >
          <Text style={styles.textoBotao}>Editar dados</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <Text style={styles.sectionTitle}>
            Editar Perfil
          </Text>
''
          <Input label="Nome" value={perfilEditando.nome}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, nome: t }))
            }
          />

          <Input label="Email" value={perfilEditando.email}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, email: t }))
            }
          />

          <Input label="Telefone" value={perfilEditando.telefone}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, telefone: t }))
            }
          />

          <Input label="Senha" secure
            value={perfilEditando.senha}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, senha: t }))
            }
          />

          <Input label="Confirmar senha" secure
            value={perfilEditando.senha_confirmar}
            onChange={(t) =>
              setPerfilEditando(p => ({ ...p, senha_confirmar: t }))
            }
          />

          {erroSenha ? (
            <Text style={styles.erro}>
              {erroSenha}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvar}
          >
            <Text style={styles.textoBotao}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </View>
      </Modal>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

/* COMPONENTES AUXILIARES */

function Info({ label, value }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
}

function Input({ label, value, onChange, secure }) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        secureTextEntry={secure}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}