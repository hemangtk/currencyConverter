import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: { backgroundColor: '#f4f4f4' },
        headerTintColor: '#333',
        headerTitle: 'FXCalc'
      }} 
    />
  );
}