interface AuthViewProps {
    onClose: () => void;
  }
  
  const AuthView = ({ onClose }: AuthViewProps) => {
  
    const handleLogin = () => {
      console.log("Simulando inicio de sesión...");
      onClose(); 
    };
  
    const handleRegister = () => {
      console.log("Simulando registro...");
      onClose();
    };
  
    return (
      <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-xl p-4 border w-64 z-10">
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h2 className="section-title">Cuenta</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-3 mt-3">
            <p className="text-center text-gray-600 text-sm">Únete o accede a tu cuenta</p>
              <button 
                  onClick={handleLogin}
                  className="btn-primary"
              >
                Iniciar Sesión
              </button>
              <button 
                  onClick={handleRegister}
                  className="btn-secondary"
              >
                Registrarse
              </button>
          </div>
      </div>
    );
  };
  
  export default AuthView;