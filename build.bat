@ECHO OFF
ECHO Building APK...
start cmd /k "CD android && gradlew assembleRelease"