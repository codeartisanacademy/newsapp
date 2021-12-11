import React, {useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        alignSelf:'center',
        fontWeight:'bold',
        marginBottom: 20
    },
    input: {
        borderWidth:1,
        borderColor:"lightgray",
        padding:10
    },
    button:{
        marginVertical:10,
        alignItems:'center',
        backgroundColor:'lightgrey',
        padding:10,
        borderRadius:8
    },
    newsItem:{
        marginBottom:14,
    }
})

export default function Home() {
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState();

    
    const getNews = ()=>{
        const options = {
            method: 'GET',
            url: 'https://free-news.p.rapidapi.com/v1/search',
            params: {q: 'Covid 19', lang: 'en'},
            headers: {
              'x-rapidapi-host': 'free-news.p.rapidapi.com',
              'x-rapidapi-key': '712828510dmshaa0dcff70759db4p1a1489jsn14e58546ca7a'
            }
        };

        axios.request(options)
        .then((response)=>{
            console.log(response.data.articles);
            setResults(response.data);
            
        })
        .catch(error=>console.log(error))
    }
    const renderItem = ({item})=>{
        return(
            <View key={item.id} style={styles.newsItem}>
                <Text>{item.title}</Text>
                <Text>{item.author}  {item.rights}</Text> 
            </View>
        )
    }


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Search for News</Text>
                <View>
                    <TextInput style={styles.input} />
                    <TouchableOpacity style={styles.button} onPress={()=>getNews()}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                {
                    results ?(
                        results.articles.length > 0?(
                            <FlatList
                                data={results.articles}
                                renderItem={renderItem} 
                                keyExtractor={item=>item.id}
                            />
                        ):(
                            <><Text>Your search results in no news</Text></>
                        )
                    ):(
                        <><Text>Please type keywords and search</Text></>
                    )
                    
                }
                

                         
            </View>
        </SafeAreaView>
    )
} 
