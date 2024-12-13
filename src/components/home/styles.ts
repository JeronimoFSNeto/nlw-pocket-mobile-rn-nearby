import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: colors.gray[100]
  },
  mapView: {
    flex: 1,
    backgroundColor: colors.gray[100]
  },
  calloutTitle: {
    fontSize: 14,
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
  },
  calloutDescription: {
    fontSize: 12,
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
  },

});
