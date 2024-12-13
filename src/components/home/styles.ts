import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100]
  },
  map: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
  },
  address: {
    fontSize: 12,
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
  },

});
