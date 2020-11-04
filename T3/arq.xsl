<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
        <html>
            <head>
                <title>Arquivo Arqueológico</title>
            </head>
            <body>
                <h2>Arquivo Arqueológico</h2>
                <table border="1" width="100%">
                    <tr>
                        <td width="30%" valign="top">
                            <h3>Índice de Arqueossítios</h3>
                            <ol>
                                <xsl:apply-templates select="//ARQELEM" mode="indice">
                                    <xsl:sort select="IDENTI"/>
                                </xsl:apply-templates>
                            </ol>
                        </td>
                        <td>
                            <xsl:apply-templates/>
                        </td>
                    </tr>
                </table>                
            </body>
        </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Templates de índice ............................... -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo ............................... -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <xsl:apply-templates/>
                    <address>
            [           <a href="index.html#i{generate-id()}">Voltar ao Índice</a>]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>

    <xsl:template match="TRAARQ">
        <p><b>Trabalhos arqueológicos:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="TIPO">
        <p><b>Tipo: </b> <xsl:value-of select="@ASSUNTO"/></p>
    </xsl:template>

    <xsl:template match="IMAGEM">
        <img src="../media/{@NOME}" alt="Sem imagem"/>
    </xsl:template>

    <xsl:template match="LUGAR">
        <p><b>Lugar:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="IDENTI">
        <p><b>Identidade:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="CODADM">
        <p><b>Código Administrativo:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="CONCEL">
        <p><b>Concelho:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="FREGUE">
        <p><b>Freguesia:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="CRONO">
        <p><b>Cronologia:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="LATITU">
        <p><b>Latitude:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="LONGIT">
        <p><b>Longitude:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="ALTITU">
        <p><b>Altitude:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="ACESSO">
        <p><b>Acesso:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="QUADRO">
        <p><b>Quadro:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="DESARQ">
        <p><b>Descrição Arqueológica:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="INTERP">
        <p><b>Intérprete:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="INTERE">
        <p><b>Interesse:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="BIBLIO">
        <p><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="DEPOSI">
        <p><b>Depositado em:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="AUTOR">
        <p><b>Autor:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="DATA">
        <p><b>Data:</b> <xsl:value-of select="."/></p>
    </xsl:template>

    <xsl:template match="DESCRI">
        <p><b>Descrição:</b> <xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="LIGA">
        <xsl:value-of select="."/>
    </xsl:template>


</xsl:stylesheet>




