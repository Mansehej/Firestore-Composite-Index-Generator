const ASCDSC = ['ASCENDING', 'DESCENDING']

const { combine } = require('./helpers')

module.exports = {
    getCompositeIndexes(queryDetails) {

        const sortFields = queryDetails.sortFields
        const filterFields = queryDetails.filterFields
        const isCollectionGroup = queryDetails.isCollectionGroup
        const collections = queryDetails.collections

        var ascDscCombos = [];

        // Fields only need an ascending index if they need to be filtered/searched
        filterFields.forEach(field => {
            ascDscCombos.push([field, ASCDSC[0]])
        })

        finalCombination = []

        if (sortFields.length == 0) {
            if (filterFields.length != 0) {
                var ascDscComboCombined = combine(ascDscCombos)
                finalCombination = finalCombination.concat(ascDscComboCombined)
            }
        }

        // Multiple sorts cannot be applied together, but filters/searches can
        sortFields.forEach(sortField => {
            subCombo = []
            ASCDSC.forEach(sortDirection => {
                subCombo.push([sortField, sortDirection]);
            });
            subComboCombined = combine(subCombo.concat(ascDscCombos))
            // Remove last item which contains combinations with itself
            subComboCombined.pop()
            finalCombination = finalCombination.concat(subComboCombined)
        });

        finalOutput = []

        finalCombination.forEach(combination => {
            let fields = []
            combination.forEach(subcombination => {
                if (filterFields.includes(subcombination[0])) {
                    fields.unshift(
                        {
                            "fieldPath": subcombination[0],
                            "order": subcombination[1]
                        }
                    )
                }
                else {
                    fields.push(
                        {
                            "fieldPath": subcombination[0],
                            "order": subcombination[1]
                        }
                    )
                }

            })

            for (let collection of collections) {
                outputObject = {
                    "collection": collection,
                    "queryScope": isCollectionGroup ? "COLLECTION_GROUP" : "COLLECTION",
                    "fields": fields
                }
                finalOutput.push(outputObject)
            }
        })

        return finalOutput
    }
}

