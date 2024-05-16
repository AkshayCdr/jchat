import { addr } from "../address.js/";

export const loginApi = async (userName, password) =>
  fetch(addr + ":5500/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      password,
    }),
    credentials: "include",
  });

export const logoutApi = async () =>
  fetch(addr + ":5500/users/logout", {
    method: "GET",
    credentials: "include",
  });

export const getUsersApi = async () =>
  fetch(addr + ":5500/users", {
    method: "GET",
    credentials: "include",
  });

export const getMessagesApi = async (userId, senderId) =>
  fetch(addr + `:5500/chats/${userId}/${senderId}`, {
    credentials: "include",
  });

export const sendMessageApi = async (userId, senderId, message) =>
  fetch(addr + `:5500/chats/${userId}/${senderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message: message }),
  });

export const getRoomsApi = async () =>
  fetch(addr + `:5500/room`, {
    method: "GET",
    credentials: "include",
  });

export const getRoomsByUserId = async (userId) =>
  fetch(addr + `:5500/rooms/${userId}`, {
    method: "GET",
    credentials: "include",
  });

export const addRoomApi = async (roomName, selectedUsers) =>
  fetch(addr + `:5500/rooms/${roomName}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedUsers }),
  });

export const getRoomMessagesApi = async (roomId) =>
  fetch(addr + `:5500/rooms/messages/${roomId}`, {
    method: "GET",
    credentials: "include",
  });

export const sendMessageToRoomApi = async (userId, roomId, message) =>
  fetch(addr + `:5500/rooms/messages/${roomId}/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

export const getRoomMembers = async (roomId) =>
  fetch(addr + `:5500/rooms/messages/members/${roomId}`);
