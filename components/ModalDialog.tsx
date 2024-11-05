import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ModalDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <View className="bg-white rounded-2xl p-4 w-[90%] max-w-[320px]">
          <Text className="mb-2 text-xl font-semibold text-center">
            {title}
          </Text>
          <Text className="mb-6 text-base text-center text-gray-600">
            {message}
          </Text>
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Text className="font-medium text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              <Text className="font-medium text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalDialog;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
