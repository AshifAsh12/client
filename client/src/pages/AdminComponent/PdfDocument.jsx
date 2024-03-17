import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    margin: 'auto', 
    flexDirection: 'row' 
  },
  tableCell: {
    margin: 'auto',
    marginVertical: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    width: 100,
  },
});

const PdfDocument = ({ data, examNames }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Subject</Text></View>
            {examNames.map((examName, index) => (
              <View style={styles.tableCell} key={index}>
                <Text>{examName}</Text>
              </View>
            ))}
          </View>
          {Object.entries(data).map(([subject, marks], subjectIndex) => (
            <View style={styles.tableRow} key={subjectIndex}>
              <View style={styles.tableCell}><Text>{subject}</Text></View>
              {examNames.map((examName, examIndex) => (
                <View style={styles.tableCell} key={examIndex}>
                  <Text>{marks[examName]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
