import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Home: React.FC = () => {
  return (
    <div className='h-screen bg-slate-950 p-4 flex justify-center items-center'>
      <Card className='p-4'>
        <Label>Ionic React</Label>
        <p>Ionic React is a free and open-source UI toolkit built on top of Ionic Framework.</p>
      </Card>
    </div>
  );
};

export default Home;
