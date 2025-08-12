import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true }); // replace: true ile önceki URL'yi temizler
  };

  return (
    <nav>
      <button onClick={() => handleNavigation('/student/info')}>
        Bilgilerim
      </button>
      <button onClick={() => handleNavigation('/student/period-start')}>
        Dönem Başı Seç
      </button>
      {/* diğer butonlar */}
    </nav>
  );
};