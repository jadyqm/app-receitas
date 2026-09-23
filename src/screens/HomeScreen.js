import { FlatList, StyleSheet, View } from 'react-native';

import recipesData from '../../data/recipes.json';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { colors, spacing } from '../theme';

// O .json salvo da Recipe API vem no formato { data: [...], links: {...}, meta: {...} }
const recipes = recipesData.data;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Receitas" subtitle={`${recipes.length} receitas para cozinhar hoje`} />

      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Recipe', { recipe: item })}
          />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  separator: {
    height: spacing.lg,
  },
});
