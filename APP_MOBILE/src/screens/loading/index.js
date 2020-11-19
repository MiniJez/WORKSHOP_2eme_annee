import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Colors from '../../constants/Colors';


const Loading = () => {
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.blanc}}>
            <ActivityIndicator size="large" color={Colors.orange} />
        </View>
    )
}

export default Loading;