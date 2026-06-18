import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useLobbyService } from "@/src/store/hooks";
import {
  selectNotifications,
  selectNotificationUnreadCount,
} from "@/src/store/slices/notification.slice";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import StyleSheet from "react-native-media-query";
import DisplayItem from "./display-item";
import { useApi } from "@/src/common/hooks/useApi";
import { NotificationService } from "@/src/api/services/notification.service";

function InboxPage() {
  const { onReadAllNotification } = useLobbyService();
  const notifications = useAppSelector(selectNotifications);
  const unreadIDs = useAppSelector(selectNotificationUnreadCount);

  const { execute } = useApi(NotificationService.readAll, {
    onSuccess: () => {
      onReadAllNotification();
    },
    onError: (error) => {
      console.log("errorerrorerror", error);
    },
  });

  useEffect(() => {
    if (unreadIDs > 0) {
      execute({
        status: "READ",
        typeIds: [5, 6],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadIDs]);

  return (
    <>
      <Text color="goldFlat" style={styles.t_title} dataSet={{ media: ids.t_title }}>
        Notifications
      </Text>
      <FlatList
        data={notifications}
        style={styles.scroll_style}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, key) => key.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item, index }) => <DisplayItem key={index.toString()} item={item} />}
      />
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  scroll_style: {
    paddingTop: 11,
    paddingBottom: 15,
  },
  t_title: {
    fontSize: 23,
    lineHeight: 28,
  },
});

export default InboxPage;
