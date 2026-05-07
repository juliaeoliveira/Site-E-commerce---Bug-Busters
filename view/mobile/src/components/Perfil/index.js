import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { styles } from "./style";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPerfil } from "../../services/api";

export default function Perfil({ navigation }) {
  const [nome, setNome] = useState("");

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  async function carregarPerfil() {
    try {
      const data = await getPerfil();
      setNome(data.nome);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");

      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [])
  );

  function openModal(title, content) {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  }

  return (
    <View style={styles.body}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          style={styles.foto}
          size={65}
        />

        <View>
          <Text style={styles.username}>
            {nome ? nome : "Carregando..."}
          </Text>

          <TouchableOpacity
            style={styles.botaoSair}
            onPress={handleLogout}
          >
            <Text style={styles.textoBotaoSair}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUA CONTA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sua Conta</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("dadosConta")}
          >
            <MaterialIcons name="manage-accounts" size={28} />
            <Text>Dados da conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("endereco")}
          >
            <Ionicons name="location-outline" size={28} />
            <Text>Endereços cadastrados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PEDIDOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pedidos</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("pedidos")}
          >
            <FontAwesome5 name="shopping-bag" size={24} />
            <Text>Seus pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("comprarNovamente")
            }
          >
            <Ionicons name="cart-outline" size={28} />
            <Text>Comprar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUPORTE */}
      <View style={styles.cards}>
        <Text style={styles.sectionTitles}>Suporte</Text>

        <TouchableOpacity
          style={styles.supportItem}
          onPress={() =>
            openModal(
              "WhatsApp",
              "Entre em contato conosco pelo WhatsApp:\n\n(11) 95329-2976"
            )
          }
        >
          <Ionicons
            name="logo-whatsapp"
            size={20}
            color="white"
          />
          <Text style={styles.supportText}>
            (11) 95329-2976
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportItem}
          onPress={() =>
            openModal(
              "E-mail",
              "Entre em contato através do e-mail:\n\nsobveuoficial@gmail.com"
            )
          }
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color="white"
          />
          <Text style={styles.supportText}>
            sobveuoficial@gmail.com
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() =>
            openModal(
              "Trocas e Devoluções",
              "Nossa política de trocas e devoluções foi criada para garantir uma experiência segura e transparente para nossos clientes.  Você pode solicitar a troca ou devolução de um produto em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor.    O produto deve estar sem sinais de uso, com etiqueta e embalagem original.     Para iniciar o processo, entre em contato pelo nosso suporte informando o número do pedido e o motivo da solicitação.     Após análise, nossa equipe irá orientar os próximos passos para a troca ou reembolso.",
            )
          }
        >
          <Text style={styles.link}>
            Trocas e Devoluções
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            openModal(
              "Fretes e Entregas",
              "As entregas são realizadas por transportadoras parceiras e pelos Correios, dependendo da sua região.  O prazo de entrega varia de acordo com o endereço informado no momento da compra e começa a contar após a confirmação do pagamento.  Você receberá um código de rastreamento para acompanhar seu pedido em tempo real. Trabalhamos para garantir que seu pedido chegue com segurança e dentro do prazo estimado."

            )
          }
        >
          <Text style={styles.link}>
            Fretes e Entregas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            openModal(
              "Política de Privacidade",
              "A sua privacidade é muito importante para nós. Todas as informações fornecidas durante o uso do aplicativo são armazenadas de forma segura e utilizadas apenas para melhorar sua experiência de compra. Não compartilhamos seus dados pessoais com terceiros sem sua autorização, exceto quando necessário para processamento de pedidos e entregas.  Adotamos medidas de segurança para proteger seus dados contra acesso não autorizado, alteração ou divulgação indevida."
            )
          }
        >
          <Text style={styles.link}>
            Política de Privacidade
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            openModal(
              "Termos de Uso",
              "Ao utilizar nosso aplicativo, você concorda com os termos e condições descritos abaixo.  O usuário se compromete a fornecer informações verdadeiras e atualizadas durante o cadastro e uso da plataforma.  É proibido utilizar o sistema para fins ilícitos, fraudes ou qualquer atividade que possa prejudicar a loja ou outros usuários.  Reservamo-nos o direito de atualizar ou modificar estes termos a qualquer momento, visando melhorias na plataforma e segurança dos usuários.  O uso contínuo do aplicativo após alterações implica na aceitação dos novos termos."
            )
          }
        >
          <Text style={styles.link}>Termos de Uso</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {modalTitle}
            </Text>

            <ScrollView>
              <Text style={styles.modalText}>
                {modalContent}
              </Text>
            </ScrollView>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                Fechar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}