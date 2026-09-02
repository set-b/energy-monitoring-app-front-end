import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import {
  sendApplianceNotification,
  sendCarportNotification,
} from "../services/notificationService";

export default function SettingsPage({ navigation }) {
  //toggles
  const [mainNotif, setMainNotif] = useState(true);
  const [activeNotifType, setActiveNotifType] = useState("WhatsApp");

  //interval
  const [selectedInterval, setSelectedInterval] = useState("Morning");

  //text input
  const [emailText, setEmailText] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const handlePhone = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setPhoneNo(cleaned);

      if (cleaned.length === 10) {
        setPhoneErr("");
      } else if (cleaned.length > 0) {
        setPhoneErr("Phone number must be exactly 10 digits");
      } else {
        setPhoneErr("");
      }
    }
  };

  const intervals = ["Morning", "Evening", "6 hours", "2 hours"];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainRow}>
          <Text style={styles.mainRowText}>Notifications</Text>
          <Switch
            trackColor={{ false: "#E2E8F0", true: "#0066FF" }}
            activeThumbColor={"#FFFFFF"}
            onValueChange={() => setMainNotif(!mainNotif)}
            value={mainNotif}
          />
        </View>

        <Text style={styles.subLabel}>Notify me every:</Text>
        <View style={styles.segmentContainer}>
          {intervals.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.segmentButton,
                selectedInterval === item && styles.segmentButtonActive,
              ]}
              onPress={() => setSelectedInterval(item)}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedInterval === item && styles.segmentTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Notification Types</Text>

        {["Push Notifications", "WhatsApp", "Signal", "Email"].map(
          (label, index) => {
            const isSelected = activeNotifType === label;

            return (
              <View key={index} style={styles.subRow}>
                <Text
                  style={[
                    styles.subRowText,
                    !mainNotif && { color: "#A0AEC0" },
                  ]}
                >
                  {label}
                </Text>
                <Switch
                  trackColor={{ false: "#E2E8F0", true: "#0066FF" }}
                  activeThumbColor={"#FFFFFF"}
                  onValueChange={() => setActiveNotifType(label)}
                  value={mainNotif && isSelected}
                />
              </View>
            );
          }
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="example@gmail.com"
            placeholderTextColor="#A0AEC0"
            value={emailText}
            onChangeText={setEmailText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <TextInput
            style={[styles.textInput, phoneErr ? styles.textInputError : null]}
            placeholder="123-456-789"
            placeholderTextColor="#A0AEC0"
            value={phoneNo}
            onChangeText={handlePhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {phoneErr ? <Text style={styles.errorText}>{phoneErr}</Text> : null}
        </View>

        {/* Debug / testing section */}
        <View style={styles.debugSection}>
          <Text style={styles.sectionHeader}>Debug</Text>

          <View style={styles.debugButton}>
            <Button
              title="Simulate Appliance Notification"
              onPress={() => sendApplianceNotification(2)}
            />
          </View>

          <View style={styles.debugButton}>
            <Button
              title="Simulate Carport Notification"
              onPress={() => sendCarportNotification(2)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  mainRowText: {
    fontSize: 18,
    color: "#2D3748",
  },
  subLabel: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#F7FAFC",
    borderRadius: 20,
    padding: 4,
    justifyContent: "space-between",
    marginBottom: 25,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },
  segmentButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#718096",
  },
  segmentTextActive: {
    color: "#1A202C",
    fontWeight: "600",
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A202C",
    marginTop: 10,
    marginBottom: 15,
  },
  subRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  subRowText: {
    fontSize: 15,
    color: "#4A5568",
  },
  inputGroup: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#2D3748",
    backgroundColor: "#FAFAFA",
  },
  textInputError: {
    borderColor: "#E53E3E",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  debugSection: {
    marginTop: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
    paddingTop: 20,
  },
  debugButton: {
    marginBottom: 12,
  },
});