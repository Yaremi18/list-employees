import React, { useMemo, useCallback } from 'react'
import Separator from '../../atoms/Separator'
import { Paragraph, Title } from '../../atoms/Text'
import { Tree, TreeNode } from 'react-organizational-chart'
import { Node } from './style'

const OrganizationChart = ({ data }) => {
    const root = useMemo(() => {
        // This is the root of the organization chart
        let _root
        data.forEach((firstRow) => {
            if (_root) return

            // Search the row that doesn't has a leader
            _root = data.find((secondRow) => firstRow.id !== secondRow.idlider)
        })
        return _root || {}
    }, [data])

    const calculateTree = useCallback((newData) => {
        // Iterate first over the parent node
        const _tree = newData.reduce((accum, firstRow) => {
            // Iterate over each row in data
            const children = data.reduce((accumChildren, secondRow) => {
                if (firstRow.id === secondRow.idlider) {
                    // Make recursion to calculate the children of each parent node
                    const node = calculateTree([secondRow])
                    return [...accumChildren, ...node]
                }
                return accumChildren
            }, [])

            if (firstRow.id === root.id) {
                // if is the root is not necessary add a TreeNode wrapper, because it already exists
                return [...accum, children]
            }

            // Add a TreeNode wrapper
            return [...accum, (
                <TreeNode key={firstRow.id} label={
                    <Node>
                        <Paragraph>{firstRow.nombre}</Paragraph>
                        <Separator />
                        <Paragraph>{firstRow['niveljerárquico'].toUpperCase()}</Paragraph>
                        <Paragraph>{`${firstRow['división']} > ${firstRow.area} > ${firstRow.subarea}`}</Paragraph>
                        <br />
                        <Paragraph>{`Fecha de ingreso: ${firstRow.fechadeingreso}`}</Paragraph>
                    </Node>
                }>
                    {children}
                </TreeNode>
            )]
        }, [])

        return _tree
    }, [data, root])

    if (!data.length) return null

    return (
        <>
            <Title>Organigrama</Title>
            <Tree
                lineWidth={'1px'}
                lineColor={'white'}
                lineBorderRadius={'10px'}
                label={
                    <Node>
                        <Paragraph>{root.nombre}</Paragraph>
                        <Separator />
                        <Paragraph>{root['niveljerárquico'].toUpperCase()}</Paragraph>
                        <Paragraph>{`${root['división']} > ${root.area} > ${root.subarea}`}</Paragraph>
                        <br />
                        <Paragraph>{`Fecha de ingreso: ${root.fechadeingreso}`}</Paragraph>
                    </Node>
                }
            >
            {/* Add children calling calculateTree */}
            {calculateTree([root])}
        </Tree>
      </>
    )
}

export default OrganizationChart