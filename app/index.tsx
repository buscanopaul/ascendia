import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DynamicForm from '@/components/DynamicForm';
import formConfig from '@/config/form-config.json';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <DynamicForm config={formConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});