import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Field {
  Type: string;
  Text?: string;
  ID?: string;
  Placeholder?: string;
  Title?: string;
  AlertMessage?: string;
}

interface FormConfig {
  Title: string;
  Subtitle: string;
  Fields: Field[];
}

interface DynamicFormProps {
  config: FormConfig;
}

export default function DynamicForm({ config }: DynamicFormProps) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const parseAlertMessage = (message: string): string => {
    return message.replace(/\$\{([^}]+)\}/g, (match, fieldId) => {
      return formData[fieldId as keyof typeof formData] || '';
    });
  };

  const handleButtonPress = (alertMessage: string) => {
    const parsedMessage = parseAlertMessage(alertMessage);
    Alert.alert('Message', parsedMessage);
  };

  const renderField = (field: Field, index: number) => {
    switch (field.Type) {
      case 'H1':
        return (
          <Text key={index} style={styles.heading}>
            {field.Text}
          </Text>
        );
      
      case 'Text':
        return (
          <TextInput
            key={index}
            style={styles.textInput}
            placeholder={field.Placeholder}
            value={formData[field.ID! as keyof typeof formData] || ''}
            onChangeText={(value) => handleInputChange(field.ID!, value)}
          />
        );
      
      case 'Button':
        return (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleButtonPress(field.AlertMessage!)}
          >
            <Text style={styles.buttonText}>{field.Title}</Text>
          </TouchableOpacity>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{config.Title}</Text>
      <Text style={styles.subtitle}>{config.Subtitle}</Text>
      {config.Fields.map((field, index) => renderField(field, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});