import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Image, Text, Linking, TouchableOpacity } from 'react-native';

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import api from "../../services/api";

import styles from "./styles";

interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
}

const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function formatHour(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
}

export interface Coach {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule?: ScheduleItem[];
}

interface CoachItemProps {
  coach: Coach;
  favorited: boolean;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post("connections", {
      coach_id: coach.id,
    });

    Linking.openURL(`whatsapp://send?phone=${coach.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((coachItem: Coach) => {
        return coachItem.id === coach.id;
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(coach);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: coach.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{coach.name}</Text>
          <Text style={styles.subject}>{coach.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{coach.bio}</Text>

      {coach.schedule && coach.schedule.length > 0 && (
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Horários disponíveis</Text>

          {coach.schedule.map((item, index) => (
            <Text
              key={`${item.week_day}-${item.from}-${item.to}-${index}`}
              style={styles.scheduleText}
            >
              {weekDays[item.week_day]}: {formatHour(item.from)} às{" "}
              {formatHour(item.to)}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {coach.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} style={styles.favoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} style={styles.favoriteIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} style={styles.contactIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CoachItem;
