import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRequestConfigs } from "../request";
import { createDefaultUserState, getHttpMyInfo, setHttpLogin, setHttpLogout, setHttpPassword, setHttpProfile, setHttpRegister } from "./service";
import { useAsync, useAsyncCallback } from '@codixjs/fetch';

export const MyInfoContext = createContext(createDefaultUserState());
export const ReloadMyInfoContext = createContext<() => void>(() => {});

export function useHttpMyInfo() {
  const configs = useRequestConfigs();
  return useAsync(getHttpMyInfo.namespace, () => getHttpMyInfo(configs));
}

export function useMyInfo() {
  return useContext(MyInfoContext);
}

export function useReloadMyInfo() {
  return useContext(ReloadMyInfoContext);
}

/**
 * 退出登录
 * @returns 
 */
export function useLogout() {
  const reload = useReloadMyInfo();
  const { execute, ...extras } = useAsyncCallback(setHttpLogout);
  const logout = useCallback(() => execute().then(reload), [execute, reload]);

  return {
    ...extras,
    execute: logout,
  }
}

/**
 * 登录
 * @returns 
 */
export function useLogin() {
  const reload = useReloadMyInfo();
  const [account, setAccount] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(setHttpLogin);
  const login = useCallback(
    () => execute(account, password).then(reload), 
    [execute, account, password, reload]
  );

  return {
    ...extras,
    account, setAccount,
    password, setPassword,
    execute: login,
  }
}

/**
 * 注册
 * @returns 
 */
export function useRegister() {
  const reload = useReloadMyInfo();
  const [account, setAccount] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(setHttpRegister);

  const submit = useCallback(() => {
    if (!account) return Promise.reject(new Error('请输入账号'));
    if (!password) return Promise.reject(new Error('请输入密码'));
    if (password !== confirmPassword) return Promise.reject(new Error('两次输入的密码不一致'));
    return execute(account, password).then(reload)
  }, [account, password, confirmPassword, execute, reload]);

  return {
    ...extras,
    account, setAccount,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    execute: submit,
  }
}

/**
 * 修改个人资料
 * @returns 
 */
export function useProfile() {
  const user = useMyInfo();
  const reload = useReloadMyInfo();
  const [nickname, setNickname] = useState<string>(user.nickname);
  const [email, setEmail] = useState<string>(user.email);
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [website, setWebsite] = useState<string>(user.website);
  const { execute, ...extras } = useAsyncCallback(setHttpProfile);

  const submit = useCallback(() => {
    if (!nickname) return Promise.reject(new Error('请输入昵称'));
    if (!email) return Promise.reject(new Error('请输入邮箱'));
    return execute(nickname, email, avatar, website).then(reload);
  }, [nickname, email, execute, avatar, website, reload]);

  useEffect(() => {
    setNickname(user.nickname);
    setEmail(user.email);
    setAvatar(user.avatar);
    setWebsite(user.website);
  }, [user.nickname, user.email, user.avatar, user.website]);

  return {
    ...extras,
    nickname, setNickname,
    email, setEmail,
    avatar, setAvatar,
    website, setWebsite,
    execute: submit,
  }
}

/**
 * 修改密码
 * @returns 
 */
export function usePassword() {
  const reload = useReloadMyInfo();
  const [oldPassword, setOldPassword] = useState<string>(null);
  const [newPassword, setNewPassword] = useState<string>(null);
  const [comPassword, setComPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(setHttpPassword);

  const submit = useCallback(() => {
    if (!oldPassword) return Promise.reject(new Error('请输入旧密码'));
    if (!newPassword) return Promise.reject(new Error('请输入新密码'));
    if (newPassword !== comPassword) return Promise.reject(new Error('两次输入的密码不一致'));
    return execute(oldPassword, newPassword, comPassword).then(reload);
  }, [oldPassword, newPassword, comPassword, execute, reload]);

  return {
    ...extras,
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    comPassword, setComPassword,
    execute: submit,
  }
}