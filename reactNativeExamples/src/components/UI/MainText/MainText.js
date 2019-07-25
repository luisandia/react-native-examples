import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native';

export class MainText extends Component {
    render() {
        return (
            <Text style={styles.mainText}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    mainText: {
        color: "#bbb"
    }
})
export default MainText
