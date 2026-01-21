import { Header } from "@/components/header";
import { VaultCard } from "@/components/vault-card";
import { useVaults } from "@/services/vaults";
import { FlatList, View } from "react-native";

export default function Index() {
  const vaults = useVaults();

  return (
    <View className="flex-1 bg-neutral-950">
      <Header title="Vaults" />
      <FlatList
        data={vaults}
        className="mt-4 mx-4"
        contentContainerClassName="gap-5 pb-5"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VaultCard data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
