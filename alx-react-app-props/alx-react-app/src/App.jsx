import Header from './components/Header';
import MainContent from './components/MainContent';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
      <UserProfile 
        name="Bob" 
        age="30" 
        bio="Enjoys cooking and traveling" 
      />
      <UserProfile 
        name="Charlie" 
        age="28" 
        bio="Passionate about coding and music" 
      />
      <Footer />
    </div>
  );
}

export default App;
