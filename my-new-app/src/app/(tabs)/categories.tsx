/**
 * Categories Screen
 * Screen for viewing and managing categories
 *
 * @module app/(tabs)/categories
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Category } from "@/types";
import { getCategories, deleteCategory } from "@/services/categoryService";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Typography, Spacing } from "@/constants";

/**
 * Categories screen component
 */
export default function CategoriesScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Load categories
   */
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      // Ensure categories is always an array, never null
      setCategories(Array.isArray(data) ? data : []);
    } catch (error: any) {
      // On error, set empty array instead of showing alert (for offline mode)
      setCategories([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadCategories();
    }
  }, [isAuthenticated]);

  /**
   * Handle category deletion
   */
  const handleDelete = (categoryId: string, categoryName: string) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${categoryName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCategory(categoryId);
              await loadCategories();
            } catch (error: any) {
              Alert.alert(
                "Error",
                error.message || "Failed to delete category"
              );
            }
          },
        },
      ]
    );
  };

  /**
   * Render category item
   */
  const renderCategory = ({ item }: { item: Category }) => (
    <Card style={styles.categoryCard}>
      <View style={styles.categoryContent}>
        <View
          style={[
            styles.colorIndicator,
            { backgroundColor: item.color || theme.primary },
          ]}
        />
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryName, { color: theme.text }]}>
            {item.name}
          </Text>
          {item.description && (
            <Text
              style={[
                styles.categoryDescription,
                { color: theme.textSecondary },
              ]}
            >
              {item.description}
            </Text>
          )}
        </View>
      </View>
      <Button
        title="Delete"
        onPress={() => handleDelete(item.id, item.name)}
        variant="outline"
        size="small"
      />
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Please log in to view your categories
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Categories</Text>
        <Button
          title="+ Add Category"
          onPress={() => router.push("/category/create")}
          variant="primary"
          size="small"
        />
      </View>

      {loading && (!categories || categories.length === 0) ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Loading categories...
          </Text>
        </View>
      ) : !categories || categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No categories yet. Create your first category!
          </Text>
          <Button
            title="Create Category"
            onPress={() => router.push("/category/create")}
            variant="primary"
            style={styles.createButton}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadCategories();
              }}
              tintColor={theme.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    ...Typography.heading.h2,
  },
  list: {
    padding: Spacing.md,
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    ...Typography.heading.h4,
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    ...Typography.body.small,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyText: {
    ...Typography.body.large,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  createButton: {
    marginTop: Spacing.md,
  },
});
