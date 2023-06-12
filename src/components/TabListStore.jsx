import React, {useState} from "react";
import { Tab } from '@rneui/themed';
import { View, Text } from "react-native";
import ListScrollProducts from "./FlatListProducts";
import FilterPrice from "./FilterPrice";


export default function TabListStore() {
    const [index, setIndex] = useState(0);

    handleTabChange = (selectedIndex) => {
        console.log('Pestaña seleccionada:', selectedIndex);
        setIndex(selectedIndex);
      };

      const renderContent = () => {
        switch (index) {
          case 0:
            return (
              <View style={{ flex: 1 }}>
                <FilterPrice />
                <ListScrollProducts/>
              </View>
            );
          case 1:
            return (
              <View style={{ backgroundColor: 'blue', flex: 1 }}>
                <Text>Contenido de la pestaña 2</Text>
              </View>
            );
          case 2:
            return (
              <View style={{ backgroundColor: 'green', flex: 1 }}>
                <Text>Contenido de la pestaña 3</Text>
              </View>
            );
          default:
            return null;
        }
      };
    
    return (
      <>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: '#00a524da',
            height: 4,
          }}
          variant="primary"
          containerStyle={{backgroundColor: "#000", color: "#fff"}}
        >
          <Tab.Item
            title="All"
            titleStyle={{ fontSize: 14 }}
            //icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="Categories"
            titleStyle={{ fontSize: 14 }}
            //icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="Brands"
            titleStyle={{ fontSize: 14 }}
            //icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
          />
        </Tab>
    
        {renderContent()}
      </>
    );
    };