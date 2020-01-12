
# escape=`
ARG BASE_IMAGE

FROM $BASE_IMAGE as build
COPY ../../../../Docker/data/com/wwwroot /inetpub/wwwroot

# find transform files and do transformation
#RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\transforms\\web.config.xdt' -Recurse ) | ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath $_.FullName -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; }; 



#FROM sitecoreimages.azurecr.io/sitecore-xp-standalone:9.3.0-windowsservercore-1903
# WORKDIR tests
#COPY --from=sitecoreimages.azurecr.io/sitecore-xp-standalone:9.3.0-windowsservercore-1903 /inetpub/wwwroot /inetpub/wwwroot