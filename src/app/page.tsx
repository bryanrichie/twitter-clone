import { supabase } from '@/lib/supabase';

const Home = () => {
  const setNewView = async () => {
    const { data, error } = await supabase.from('views').insert({
      name: 'random name',
    });

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  setNewView();

  return (
    <>
      <span>Reddit Clone</span>
    </>
  );
};

export default Home;
