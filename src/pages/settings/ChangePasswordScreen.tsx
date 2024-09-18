import { useEffect, useState } from 'react';

import { Button, Input, Layout, Header, Content, Column } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useTools } from '../../components/ActionComponent';
import { encrypt, hash } from '@/ui/utils/wallet';
import { PASSWORD } from '../../shared/constant';
import { setLocalValue } from '@/ui/utils';
import { useGlobalState } from '../../Context';

export default function ChangePasswordScreen() {
  const navigate = useNavigate();
  const [passwordC, setPasswordC] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [disabled, setDisabled] = useState(true);
  const tools = useTools();
  const { dispatch } = useGlobalState();

  useEffect(() => {
    setDisabled(true);
    if (password) {
      if (password.length < 6) {
        tools.toastWarning('at least five characters');
        return;
      }

      if (password !== password2) {
        tools.toastWarning('Entered passwords differ');
        return;
      }

      if (passwordC) {
        setDisabled(false);
      }
    }
  }, [passwordC, password, password2]);

  const handleOnBlur = (e: any, type: string) => {
    switch (type) {
      case 'password':
        setPassword(e.target.value);
        break;
      case 'password2':
        setPassword2(e.target.value);
        break;
      case 'passwordC':
        setPasswordC(e.target.value);
        break;
    }
  };

  const verify = async () => {
    try {
      const currentPassword = localStorage.getItem('password') || sessionStorage.getItem('password');
      if(currentPassword !== passwordC) {
        tools.toastError('incorrect password');
      } else {
        dispatch({ type: 'SET_PASSWORD', payload: password });
        const encryptedPassword = encrypt(hash(password), password)
        sessionStorage.setItem('password', password)
        localStorage.setItem('password', password)
        await setLocalValue({ [PASSWORD]: encryptedPassword });
        tools.toastSuccess('Success');
        navigate('/home');
      }
    } catch (err) {
      tools.toastError((err as any).message);
    }
  };
  return (
    <Layout>
      <Header
        title="Change Password"
      />
      <Content>
        <Column gap="lg">
          <Input
            preset="password"
            placeholder="Current Password"
            onBlur={(e: any) => {
              handleOnBlur(e, 'passwordC');
            }}
            autoFocus={true}
          />
          <Input
            preset="password"
            placeholder="New Password"
            onBlur={(e: any) => {
              handleOnBlur(e, 'password');
            }}
          />
          <Input
            preset="password"
            placeholder="Confirm Password"
            onBlur={(e: any) => {
              handleOnBlur(e, 'password2');
            }}
          />
          <Button
            disabled={disabled}
            text="Change Password"
            preset="primary"
            onClick={() => {
              verify();
            }}
          />
        </Column>
      </Content>
    </Layout>
  );
}
