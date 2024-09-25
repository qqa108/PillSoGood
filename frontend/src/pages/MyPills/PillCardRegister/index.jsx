import { Outlet } from 'react-router-dom';

function PillCardRegister() {
  return <>
  {/* 이 부분에 기본적으로 보여줄 내용을 추가할 수 있습니다. */}
  <h1>Pill Card Register Page</h1>

  {/* Outlet을 통해 자식 라우트가 렌더링될 수 있도록 설정 */}
  <Outlet />
</>
}

export default PillCardRegister;
