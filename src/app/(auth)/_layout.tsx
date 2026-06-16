import { NativeTabs } from "expo-router/unstable-native-tabs";

const AuthLayout = () => {
  return (
     <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{default: "house", selected: "house.fill"}}  />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="pets">
        <NativeTabs.Trigger.Icon sf={{default: "pawprint", selected: "pawprint.fill"}}  />
        <NativeTabs.Trigger.Label>Pets</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf={{default: "person", selected: "person.fill"}}/>
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
};

export default AuthLayout;